import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React, { FC, useState } from 'react';

interface CopyTextProps {
  text: string;
  style?: React.CSSProperties;
}

const CopyText: FC<CopyTextProps> = props => {
  const { text, style } = props;
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <InputGroup size="md" style={style}>
      <Input disabled value={text} />
      <InputRightAddon width={'80px'} justifyContent={'center'} cursor={'pointer'} onClick={handleCopyToClipboard}>
        {copied ? '成功！' : '复制'}
      </InputRightAddon>
    </InputGroup>
  );
};
export default CopyText;
