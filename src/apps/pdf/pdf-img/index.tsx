import { CustomFile, Upload } from '@/components/Upload';
import React, { FC, useState } from 'react';
import { Box, Button, CloseButton, Flex, List, ListIcon, ListItem, Spacer, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
const PdfToImg: FC = () => {
  const [fileList, setFileList] = useState<CustomFile[]>([]);
  console.log(fileList, 'fileee');
  return (
    <div>
      <Upload accept={['.pdf']} multiple fileList={fileList} onChange={setFileList}>
        <Button colorScheme="teal">点击选择pdf文件</Button>
      </Upload>
      <List border={'var(--border-main)'} padding={'16px'} marginTop={'10px'}>
        {fileList.map((item, index) => {
          return (
            <ListItem
              _hover={{
                bgColor: 'var(--main-bg-grey)',
              }}
              transition={'var(--transition-bg)'}
              key={index}
            >
              <Flex alignItems={'center'}>
                <Box>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  {item.file?.name}
                </Box>
                <Spacer />
                <Box>
                  <CloseButton />
                </Box>
              </Flex>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
export default PdfToImg;
