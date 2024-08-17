import XL from 'xlsx';
import fs from 'fs';

class _XLSheetManager {
  public async cleanWriteToExcel(filePath: string, data: any[][], sheetName: string = 'Sheet1') {
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
    }
    const workbook = XL.utils.book_new();
    const worksheet = XL.utils.aoa_to_sheet(data);

    XL.utils.book_append_sheet(workbook, worksheet, sheetName);
    await XL.writeFile(workbook, filePath);

    return filePath;
  }

  public readAsJSON<T>(filePath: string, sheetName: string = 'Sheet1'): T[] {
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XL.read(fileBuffer, { type: 'buffer' });

    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      throw new Error(`Sheet ${sheetName} does not exist`);
    }

    const jsonData = XL.utils.sheet_to_json<T>(worksheet);
    return jsonData;
  }

  public async downloadSheet(url: string, savePath: string) {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    const fileBuffer = Buffer.from(await res.arrayBuffer());
    const workbook = XL.read(fileBuffer, { type: 'buffer' });

    XL.writeFile(workbook, savePath);

    return savePath;
  }

  public async readFromRemote<T>(url: string, sheetName: string = 'Sheet1'): Promise<T[]> {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    const fileBuffer = Buffer.from(await res.arrayBuffer());
    const workbook = XL.read(fileBuffer, { type: 'buffer' });

    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) throw new Error("Sheet doesn't exist");

    return XL.utils.sheet_to_json<T>(worksheet);
  }
}

export default new _XLSheetManager();
