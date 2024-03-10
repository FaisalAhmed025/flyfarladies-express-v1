// import fs from 'fs';
// import path from 'path';
// import sharp from 'sharp';

// // export const deleteFiles = async rows => {
// //   const imageFieldNames = [
// //     'first_image',
// //     'second_image',
// //     'third_image',
// //     'fourth_image',
// //     'fifth_image',
// //   ];

// //   for (const row of rows) {
// //     for (const fieldName of imageFieldNames) {
// //       const filePath = row[fieldName];
// //       console.log(`Deleting file for ${fieldName}: ${filePath}`);
// //       await deleteFile(filePath); // Make sure to use await here
// //     }
// //   }
// // };


// export const deleteFile = filePath => {
//   // console.log(filePath +' here')
//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath);
//     console.log(`File '${filePath}' removed.`);
//   } else {
//     console.log(`File '${filePath}' not found.`);
//   }
// };

// export const deleteFolderRecursive = path => {
//   if (fs.existsSync(path)) {
//     fs.readdirSync(path).forEach(file => {
//       const curPath = `${path}/${file}`;
//       if (fs.lstatSync(curPath).isDirectory()) {
//         deleteFolderRecursive(curPath);
//         fs.rmdirSync(curPath);
//       } else {
//         fs.unlinkSync(curPath);
//       }
//     });
//   }
// };
// /// other format to webP
// export const deleteFiles = async (oldRows, newRows) => {
//   const imageFieldNames = [
//     'first_image',
//     'second_image',
//     'third_image',
//     'fourth_image',
//     'fifth_image',
//   ];

//   for (const oldRow of oldRows) {
//     for (const fieldName of imageFieldNames) {
//       const oldFilePath = oldRow[fieldName];

//       // Check if newRows is defined and not empty before accessing it
//       if (newRows && newRows.length > 0) {
//         const newFilePath = newRows.find(row => row.id === oldRow.id)[
//           fieldName
//         ];

//         if (oldFilePath !== newFilePath) {
//           console.log(`Deleting old file for ${fieldName}: ${oldFilePath}`);
//           await deleteFile(oldFilePath); // Make sure to use await here
//         }
//       }
//     }
//   }
// };

// export const convertToWebP = async (inputPath, outputPath) => {
//   console.log(inputPath, outputPath);
//   const webpOutputPath = path.join('public', 'uploads', outputPath + '.webp');
//   return new Promise(async (resolve, reject) => {
//     try {
//       await sharp(inputPath)
//         .webp() // Convert to WebP format
//         .toFile(webpOutputPath);
//       console.log(`File '${webpOutputPath}' created.`);
//       resolve(webpOutputPath);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// // remove file extension
// export function removeFileExtension(filename) {
//   // Use a regular expression to remove known file extensions
//   const cleanedFilename = filename.replace(/\.(png|jpg|jpeg|pdf)$/i, '');

//   // Optionally, you can remove trailing hyphens or underscores
//   const finalFilename = cleanedFilename.replace(/[-_]+$/, '');

//   return finalFilename;
// }
