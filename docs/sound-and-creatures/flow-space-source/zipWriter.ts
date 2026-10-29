// Self-contained PKZIP generator with CRC32 calculation in pure TS
export interface ZipFileEntry {
  filename: string;
  data: Uint8Array;
}


// Precomputed CRC32 table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c >>> 0;
}


export function computeCRC32(data: Uint8Array): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}


export function createZipArchive(files: ZipFileEntry[]): Uint8Array {
  const localHeaders: Uint8Array[] = [];
  const centralRecords: Uint8Array[] = [];
  let offset = 0;


  const now = new Date();
  const time = ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)) & 0xFFFF;
  const date = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xFFFF;


  for (const file of files) {
    const encoder = new TextEncoder();
    const nameBytes = encoder.encode(file.filename);
    const crc = computeCRC32(file.data);
    const size = file.data.length;


    // Local file header: 30 bytes + filename
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(localHeader.buffer);


    localView.setUint32(0, 0x04034B50, true); // Local file header signature
    localView.setUint16(4, 20, true);         // Version needed: 2.0
    localView.setUint16(6, 0, true);          // General purpose bit flag
    localView.setUint16(8, 0, true);          // Compression method: 0 (stored / uncompressed)
    localView.setUint16(10, time, true);      // File last mod time
    localView.setUint16(12, date, true);      // File last mod date
    localView.setUint32(14, crc, true);       // CRC-32
    localView.setUint32(18, size, true);      // Compressed size
    localView.setUint32(22, size, true);      // Uncompressed size
    localView.setUint16(26, nameBytes.length, true); // File name length
    localView.setUint16(28, 0, true);         // Extra field length
    localHeader.set(nameBytes, 30);


    localHeaders.push(localHeader);
    localHeaders.push(file.data);


    // Central directory header: 46 bytes + filename
    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(centralHeader.buffer);


    centralView.setUint32(0, 0x02014B50, true); // Central directory file header signature
    centralView.setUint16(4, 20, true);         // Version made by
    centralView.setUint16(6, 20, true);         // Version needed to extract
    centralView.setUint16(8, 0, true);          // General purpose bit flag
    centralView.setUint16(10, 0, true);         // Compression method: 0
    centralView.setUint16(12, time, true);      // Mod time
    centralView.setUint16(14, date, true);      // Mod date
    centralView.setUint32(16, crc, true);       // CRC32
    centralView.setUint32(20, size, true);      // Compressed size
    centralView.setUint32(24, size, true);      // Uncompressed size
    centralView.setUint16(28, nameBytes.length, true); // File name length
    centralView.setUint16(30, 0, true);         // Extra field length
    centralView.setUint16(32, 0, true);         // File comment length
    centralView.setUint16(34, 0, true);         // Disk number start
    centralView.setUint16(36, 0, true);         // Internal file attributes
    centralView.setUint32(38, 0, true);         // External file attributes
    centralView.setUint32(42, offset, true);    // Relative offset of local file header
    centralHeader.set(nameBytes, 46);


    centralRecords.push(centralHeader);


    offset += localHeader.length + size;
  }


  const centralOffset = offset;
  let centralSize = 0;
  for (const cr of centralRecords) {
    centralSize += cr.length;
  }


  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054B50, true); // End of central dir signature
  eocdView.setUint16(4, 0, true);          // Disk number
  eocdView.setUint16(6, 0, true);          // Central directory disk
  eocdView.setUint16(8, files.length, true);  // Number of central dir records on this disk
  eocdView.setUint16(10, files.length, true); // Total number of central dir records
  eocdView.setUint32(12, centralSize, true);   // Size of central directory
  eocdView.setUint32(16, centralOffset, true); // Offset of start of central directory
  eocdView.setUint16(20, 0, true);             // Comment length


  const totalLength = offset + centralSize + eocd.length;
  const result = new Uint8Array(totalLength);
  let pos = 0;


  for (const part of localHeaders) {
    result.set(part, pos);
    pos += part.length;
  }
  for (const part of centralRecords) {
    result.set(part, pos);
    pos += part.length;
  }
  result.set(eocd, pos);


  return result;
}


