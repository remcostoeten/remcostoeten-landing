#!/bin/bash

# Directory containing the images
dir="~/sites/REMCOSTOETEN_DIR/blog/blog-remcostoetn/public/blog/inspiration/"

# Loop over each .png file in the directory
for file in $dir*.png; do
  # Get the base name of the file (without the .png extension)
  base=$(basename "$file" .png)

  # Convert and compress the image to .webp format
  cwebp -quiet -q 50 "$file" -o "$dir$base.webp"
done
