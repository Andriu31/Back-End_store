import { v2 as cloudinary } from 'cloudinary';

export const upload = async (file) => {

    cloudinary.config({ 
        cloud_name: 'djxlrlfvb', 
        api_key: '945784973266933', 
        api_secret: 'bj1K2Po-pMJSoojynESA5RbdioQ' // Click 'View API Keys' above to copy your API secret
    });
// Upload an image
const uploadResult = await cloudinary.uploader
.upload(
    'https://scontent.fmec2-1.fna.fbcdn.net/v/t39.30808-6/357389856_1702715483497083_8984406531256051492_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFIXefjpYkBUEq9fFvTC5PNv1O8vDGx4vS_U7y8MbHi9L1rQr_F45Cf3Kkp37hxvSa6AcYio9IdBNn-vn2syaPi&_nc_ohc=iMvNUpBjLXwQ7kNvgH3I5M5&_nc_oc=AdgKwWe7cBqqoJ1bQZlJnL639jwkvk9tc6O7ls5auSQzg6XmREHiGu1aO5dzvihZA4I&_nc_zt=23&_nc_ht=scontent.fmec2-1.fna&_nc_gid=AYSChCOazZxCQiKSh8a8H0M&oh=00_AYCjKXDuomDDWZZ7BwX4IlMLsjTreW6d1C_KR-Zy9thlrg&oe=6794B241', {
        public_id: 'Angel',
    }
)
.catch((error) => {
    console.log(error);
});

console.log(uploadResult);

// Optimize delivery by resizing and applying auto-format and auto-quality
const optimizeUrl = cloudinary.url('Angel', {
    fetch_format: 'auto',
    quality: 'auto'
});

console.log(optimizeUrl);

// Transform the image: auto-crop to square aspect_ratio
const autoCropUrl = cloudinary.url('Angel', {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
});

console.log(autoCropUrl);  

 return uploadResult;
}