import tensorflow as tf

@APSX_Logger.log_and_time
def run_tflite_model(frame, model_path="superV.tflite", confidence_threshold=0.5):
    """
    Runs a TensorFlow Lite model on a given frame.

    Args:
        frame: The input frame (NumPy array).
        model_path: Path to the TFLite model file.
        confidence_threshold: Minimum confidence score for detections.

    Returns:
        A list of detections, where each detection is a tuple: (class_id, confidence, bbox),
        where bbox is (xmin, ymin, xmax, ymax) in normalized coordinates.
    """

    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Resize the frame to the model's expected input size
    input_size = input_details[0]['shape'][1:3]  # Assuming NHWC format
    resized_frame = cv2.resize(frame, tuple(input_size))

    # Add a batch dimension
    input_data = np.expand_dims(resized_frame, axis=0)

    # Set the input tensor
    interpreter.set_tensor(input_details[0]['index'], input_data)

    # Run inference
    interpreter.invoke()

    # Get the output tensors
    boxes = interpreter.get_tensor(output_details[0]['index'])  # Bounding boxes
    classes = interpreter.get_tensor(output_details[1]['index'])  # Class IDs
    scores = interpreter.get_tensor(output_details[2]['index'])  # Confidence scores
    num_detections = interpreter.get_tensor(output_details[3]['index'])  # Number of detections

    detections = []
    for i in range(int(num_detections)):
        if scores[0][i] > confidence_threshold:
            class_id = int(classes[0][i])
            confidence = float(scores[0][i])
            ymin, xmin, ymax, xmax = boxes[0][i]
            detections.append((class_id, confidence, (xmin, ymin, xmax, ymax)))

    return detections
# 



#