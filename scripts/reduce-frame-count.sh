#!/bin/bash

# Script to reduce frame count by keeping every Nth frame
# This can reduce file count from 250 to 125, 83, or 62 frames

INPUT_DIR="public/blowup_shot"
BACKUP_DIR="public/blowup_shot_backup"
KEEP_EVERY=2  # Keep every 2nd frame (halves the total)

echo "Reducing frame count in $INPUT_DIR"
echo "Keeping every ${KEEP_EVERY}th frame"
echo ""

# Create backup first
if [ ! -d "$BACKUP_DIR" ]; then
  echo "Creating backup at $BACKUP_DIR..."
  cp -r "$INPUT_DIR" "$BACKUP_DIR"
  echo "Backup complete!"
else
  echo "Backup already exists at $BACKUP_DIR"
fi

echo ""
echo "Original frame count:"
ls "$INPUT_DIR"/*.png 2>/dev/null | wc -l

# Delete frames we don't want to keep
deleted_count=0
for i in $(seq 1 250); do
  # If this frame number is not divisible by KEEP_EVERY, delete it
  if [ $((i % KEEP_EVERY)) -ne 0 ]; then
    file="$INPUT_DIR/$(printf "%04d.png" $i)"
    if [ -f "$file" ]; then
      rm "$file"
      ((deleted_count++))
    fi
  fi
done

echo "Deleted frames: $deleted_count"
echo ""
echo "New frame count:"
ls "$INPUT_DIR"/*.png 2>/dev/null | wc -l

echo ""
echo "Original size:"
du -sh "$BACKUP_DIR"
echo "New size:"
du -sh "$INPUT_DIR"

echo ""
echo "Done! Remember to update frameCount in your component."
echo "Set frameCount to: $(ls "$INPUT_DIR"/*.png 2>/dev/null | wc -l)"
