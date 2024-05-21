import { CustomFile, Upload } from '@/components/Upload';
import React, { FC, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Progress,
  Spacer,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon, DownloadIcon } from '@chakra-ui/icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { TextScroll, TextWithTooltip } from '@/components/TextComponents';
import globalConfig from '@/constants/config';
import { clickDownload } from '@/utils/file';

const PdfToImg: FC = () => {
  const [fileList, setFileList] = useState<CustomFile[]>([]);
  const [parent] = useAutoAnimate(/* optional config */);

  const deleteItemFile = (fileItem: CustomFile) => {
    const { id } = fileItem;
    const newFileList = fileList.filter(item => item.id !== id);
    setFileList(newFileList);
  };
  const downloadZip = (fileItem: CustomFile) => {
    const res = fileItem.res?.data;
    if (res) {
      clickDownload(res.url, res.name);
    }
  };

  const getStatus = (fileItem: CustomFile) => {
    if (fileItem.progress < 100) {
      return {
        text: '上传中',
        color: 'blue',
      };
    } else {
      if (fileItem.res) {
        const { code } = fileItem.res || {};
        if (code == 0) {
          return {
            text: '成功',
            color: 'green',
          };
        } else {
          return {
            text: '失败',
            color: 'red',
          };
        }
      } else {
        return {
          text: '转化中',
          color: 'teal',
        };
      }
    }
  };

  return (
    <div>
      <Alert status="warning" marginBottom={'16px'}>
        <AlertIcon />
        转化时间较长，请耐心等待！
      </Alert>
      <Upload>
        <Button colorScheme="teal">点击选择pdf文件</Button>
      </Upload>
      <List border={'var(--border-main)'} padding={'16px'} marginTop={'16px'} ref={parent}>
        {fileList.map(item => {
          const tagConfig = getStatus(item);
          return (
            <ListItem
              _hover={{
                bgColor: 'var(--main-bg-grey)',
              }}
              transition={'var(--transition-bg)'}
              key={item.id}
              padding={'10px'}
              borderRadius={'4px'}
            >
              <Flex alignItems={'center'}>
                <Box flex={4}>
                  <Flex alignItems={'center'} marginBottom={'6px'}>
                    {/* <ListIcon as={CheckCircleIcon} color="green.500" /> */}
                    <Text>{item.file?.name}</Text>
                    {/* <TextScroll text={item.file?.name} /> */}
                  </Flex>
                  <Flex alignItems={'center'}>
                    <Tag variant="solid" size={'sm'} flexShrink={0} marginRight={'6px'} colorScheme={tagConfig.color}>
                      {tagConfig.text}
                    </Tag>
                    <Progress minWidth={'100px'} flex={1} colorScheme="green" size="md" value={item.progress} />
                  </Flex>
                </Box>

                <Spacer />
                <Flex>
                  {item.res && (
                    <IconButton
                      size={'sm'}
                      onClick={() => downloadZip(item)}
                      variant="outline"
                      colorScheme="teal"
                      aria-label="none"
                      icon={<DownloadIcon />}
                      marginRight={'10px'}
                    />
                  )}
                  <IconButton
                    onClick={() => deleteItemFile(item)}
                    size={'sm'}
                    variant="outline"
                    colorScheme="teal"
                    aria-label="none"
                    icon={<CloseIcon />}
                  />
                </Flex>
              </Flex>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
export default PdfToImg;
