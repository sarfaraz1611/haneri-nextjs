#!/bin/bash

# Script to aggressively compress PNG images
# This can reduce 2GB to ~200-400MB

INPUT_DIR="public/blowup_shot"
OUTPUT_DIR="public/blowup_shot_compressed"

mkdir -p "$OUTPUT_DIR"

echo "Compressing images from $INPUT_DIR to $OUTPUT_DIR"
echo "This may take a while..."

# Option 1: Convert to WebP (best compression)
echo "Converting to WebP format..."
for file in "$INPUT_DIR"/*.png; do
  filename=$(basename "$file" .png)
  cwebp -q 75 -m 6 "$file" -o "$OUTPUT_DIR/${filename}.webp"
  echo "Processed: $filename"
done

echo ""
echo "Compression complete!"
echo "Original size:"
du -sh "$INPUT_DIR"
echo "Compressed size:"
du -sh "$OUTPUT_DIR"

# Calculate compression ratio
original_size=$(du -sk "$INPUT_DIR" | cut -f1)
compressed_size=$(du -sk "$OUTPUT_DIR" | cut -f1)
ratio=$(echo "scale=2; ($original_size - $compressed_size) * 100 / $original_size" | bc)
echo "Compression ratio: ${ratio}%"
