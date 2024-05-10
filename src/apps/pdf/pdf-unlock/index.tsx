import { CustomFile, Upload } from '@/components/Upload';
import React, { FC, useRef, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Spacer,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon, DownloadIcon } from '@chakra-ui/icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { TextScroll, TextWithTooltip } from '@/components/TextComponents';
import globalConfig from '@/constants/config';
import { clickDownload } from '@/utils/file';

const UnlockPdf: FC = () => {
  const [fileList, setFileList] = useState<CustomFile[]>([]);
  const [parent] = useAutoAnimate(/* optional config */);
  const uploadRef = useRef();
  const inputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    if (fileItem.progress === 0) {
      return {
        text: '等待中',
        color: 'blue',
      };
    }

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

  const onConfirm = () => {
    const value = inputRef.current?.value;
    const nextList = fileList.map(item => {
      return {
        ...item,
        password: value,
      };
    });
    uploadRef.current?.upload(nextList);
    onClose();
    // if (inputRef.current) {
    //   inputRef.current.value = '';
    // }
  };

  return (
    <div>
      <Alert status="warning" marginBottom={'16px'}>
        <AlertIcon />
        转化时间较长，请耐心等待！
      </Alert>
      <Upload
        ref={uploadRef}
        uploadTrigger="custom"
        accept={['.pdf']}
        fileList={fileList}
        onChange={files => {
          setFileList(files);
        }}
        onFileChange={onOpen}
        url="/api/util/pdf-unlock"
      >
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>请输出密码</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input ref={inputRef} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onConfirm}>
              确认
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default UnlockPdf;
