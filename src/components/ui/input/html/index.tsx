'use client';

import { FC, useRef } from 'react';
import dynamic from 'next/dynamic';

import styles from './index.module.scss';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

export const InputHTML: FC<Props> = ({
  value,
  onChange,
  placeholder,
  disabled,
  error,
}) => {
  const editor = useRef(null);

  return (
    <div className={`html ${styles.editor} ${error && styles.error}`}>
      <JoditEditor
        ref={editor}
        value={value}
        config={{
          readonly: disabled,
          placeholder: placeholder || '',
          height: 600,
          allowResizeX: false,
          allowResizeY: false,
          dialog: {
            draggable: false,
          },
          uploader: {
            insertImageAsBase64URI: true,
          },
          toolbarAdaptive: false,
        }}
        tabIndex={1}
        onBlur={(value) => onChange && onChange(value)}
        //onChange={onChange}
      />
    </div>
  );
};
