import streamlit as st
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.tree import DecisionTreeClassifier
import joblib

# Define a function to load and preprocess the dataset
def load_dataset(file):
    # Load the dataset
    dataset = pd.read_csv(file, header=None)

    # Split the dataset into X and Y
    X = dataset.iloc[:, :-1].values
    Y = dataset.iloc[:, -1].values

    # Normalize X using MinMaxScaler
    scaler = MinMaxScaler()
    X = scaler.fit_transform(X)

    # Split the dataset into 30:70 ratio for training and testing
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.7, random_state=42, stratify=Y)

    return X_train, X_test, Y_train, Y_test

# Define the Streamlit web app
def main():
    # Set the title and page layout
    st.title('Model Performance Checker')
    
    # Add a file uploader
    file = st.file_uploader('Upload a CSV file', type=['csv'])

    # Add a note in the sidebar
    st.sidebar.subheader('Important Note')
    st.sidebar.write("Our model is only trained on ARP Poisoning and SSDP-Flood DDoS attacks, and it will only detect these types of attacks based on the provided dataset.")

    if file is not None:
        # Load and preprocess the dataset
        X_train, X_test, Y_train, Y_test = load_dataset(file)

        # Check if the model file exists
        try:
            # Try to load the pre-trained model
            model = joblib.load('my_model.pkl')
            st.write("Loaded existing model.")
        except:
            st.write("Training a new model as existing model could not be loaded or does not exist.")
            # If loading fails, train a new model
            model = DecisionTreeClassifier()
            model.fit(X_train, Y_train)
            # Save the newly trained model
            joblib.dump(model, 'my_model.pkl')
            st.write("Trained and saved a new model.")

        # Ensure the model is trained on the current data
        model.fit(X_train, Y_train)

        # Make predictions on the testing set
        Y_pred = model.predict(X_test)

        # Calculate the accuracy and confusion matrix
        accuracy = accuracy_score(Y_test, Y_pred)
        matrix = confusion_matrix(Y_test, Y_pred)

        # Print the performance metrics
        st.write('Accuracy:', accuracy)
        st.write('Confusion Matrix:', matrix)

# Run the Streamlit web app
if __name__ == '__main__':
    main()
#& "C:\Users\arham\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.12_qbz5n2kfra8p0\LocalCache\local-packages\Python312\Scripts\streamlit.exe" run main.py
