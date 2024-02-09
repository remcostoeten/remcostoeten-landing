import os
import shutil

def move_files_to_current_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            old_location = os.path.join(root, file)
            new_location = os.path.join('.', file)
            
            # Check if file with the same name already exists in the destination
            if os.path.exists(new_location):
                print(f"File {file} already exists.")
            else:
                shutil.move(old_location, new_location)
                print(f"Moved: {old_location} to {new_location}")

# Call the function with the current directory as the argument
move_files_to_current_dir('.')

