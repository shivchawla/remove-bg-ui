#!/bin/bash
if [ -z "$1" ]
  then
    echo "No argument supplied"
  else
    file="$1"
    filename="${file%.*}"
    extension="${file##*.}"
    if [ "$extension" == "jpg" ] || [ "$extension" == "jpeg" ]
      then
        convert $file pc.png
      else
        cp -uf $file "pc.${extension}"    
    fi
fi

size=$(identify -format '%wx%h' pc.png)
convert "${filename}-removebg-preview.png" -alpha extract pc_mask.png
convert pc_mask.png -resize ${size} pc_mask_resize.png
convert pc.png pc_mask_resize.png -alpha off -compose CopyOpacity -composite pc_composite.png

cp -uf pc_composite.png "${filename}-removebg-full.png"
rm pc.png pc_mask.png pc_mask_resize.png pc_composite.png