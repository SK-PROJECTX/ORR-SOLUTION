# Cloudinary Setup Instructions

## Step 1: Create Upload Preset
1. Go to your Cloudinary Dashboard: https://cloudinary.com/console
2. Navigate to **Settings** → **Upload**
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Set the following:
   - **Preset name**: `orr_uploads`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `profile_pics` (optional)
   - **Allowed formats**: `jpg,png,gif,webp`
   - **Max file size**: `10000000` (10MB)
   - **Max image width**: `1000`
   - **Max image height**: `1000`
6. Click **Save**

## Step 2: Environment Variables
The following environment variables are already set in `.env.local`:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djoahpirg`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=orr_uploads`

## Step 3: Test Upload
After creating the upload preset, the image upload should work automatically.

## Troubleshooting
If you get "Upload preset not found" error:
1. Make sure the preset name matches exactly: `orr_uploads`
2. Ensure the preset is set to "Unsigned" mode
3. Check that your cloud name is correct: `djoahpirg`