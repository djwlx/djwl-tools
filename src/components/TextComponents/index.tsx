import { Box, Tooltip, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import styles from './index.module.scss';

interface TextWithTooltipProps {
  content: string;
  children: string;
  width?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const TextWithTooltip = (props: TextWithTooltipProps) => {
  const { content, children, width, style, disabled } = props;
  return (
    <Tooltip isDisabled={disabled} label={content}>
      <Box width={width} whiteSpace={'nowrap'} overflow="hidden" textOverflow="ellipsis" style={style}>
        <Text>{children}</Text>
      </Box>
    </Tooltip>
  );
};

interface TextScrollProps {
  style?: React.CSSProperties;
  text: string;
}

// TODO 待完善
export const TextScroll = (props: TextScrollProps) => {
  const { style, text } = props;

  useEffect(() => {}, []);
  return (
    <Box className={styles['parent-container']} style={style}>
      <Box className={styles['scroll-container']}>
        <Text className={styles['scroll-content']}>{text}</Text>
      </Box>
    </Box>
  );
};
