import Upload from '@/components/Upload';
import React, { FC } from 'react';
const PdfToImg: FC = () => {
  return (
    <div>
      <Upload url="/api/file/upload" />
    </div>
  );
};
export default PdfToImg;
