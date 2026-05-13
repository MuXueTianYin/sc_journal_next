import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function deleteTxtFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      deleteTxtFiles(filePath);
    } else if (path.extname(file) === '.txt') {
      fs.unlinkSync(filePath);
      console.log(`已删除: ${filePath}`);
    }
  });
}

const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
  deleteTxtFiles(outDir);
  console.log('清理完成！');
} else {
  console.log('out 目录不存在，跳过清理');
}
