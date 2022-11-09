import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react';
import Dropzone, { Accept, DropzoneOptions, DropzoneRef, FileRejection } from 'react-dropzone';
import { CrossIcon, ImageIcon } from 'components/icons/outline';
import { DEFAULT_ALLOW_IMAGE_EXTENSIONS, DEFAULT_MAX_IMAGE_SIZE } from 'lib/constants';
import { SVG } from 'types/index';
import { Button } from 'components/atoms';

const NAME = 'FileImage';

export type FileImageSize = 'sm' | 'md' | 'lg';
export type FileImageType = 'circle' | 'rectangle';

/**
 * The class name for the image wrapper.
 * @param size The size of the FileImage.
 */
export const FileImageSizes: Record<FileImageSize, string> = {
  sm: 'sm:h-35 sm:w-35 w-24.5 h-24.5',
  md: 'w-full h-60 max-w-md',
  lg: 'w-full h-60 max-w-2xl',
} as const;

/**
 * The class name for the FileImage shape.
 * @param imageType The shape of the FileImage.
 */
export const FileImageTypes: Record<FileImageType, string> = {
  circle: 'flex overflow-hidden rounded-full',
  rectangle: 'flex rounded-xl',
} as const;

export interface FileImageProps extends DropzoneOptions {
  size?: FileImageSize;
  imageType?: FileImageType;
  acceptFile?: Accept;
  Icon?: SVG;
  error?: string;
  className?: string;
  innerClass?: string;
  value?: any;
  onSubmit?: (file: any) => void;
}

/* ---------------------------------------------------------------------------------------------------------------------
 * FileImage
 * ------------------------------------------------------------------------------------------------------------------ */

export const FileImage = React.forwardRef<DropzoneRef, FileImageProps>(
  (
    {
      maxSize = DEFAULT_MAX_IMAGE_SIZE,
      acceptFile = DEFAULT_ALLOW_IMAGE_EXTENSIONS,
      size = 'sm',
      Icon = ImageIcon,
      imageType = 'circle',
      error,
      className,
      innerClass,
      value = null,
      onSubmit,
    },
    ref,
  ) => {
    const [file, setFile] = useState<File | null>(value);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
      if (error) {
        setErrorMessage(error);
      }
    }, [error]);

    useEffect(() => {
      if (value) {
        setFile(value);
      }
    }, [value]);

    const onDrop = (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        setFile(acceptedFiles[0]);
        setErrorMessage('');
        onSubmit?.(acceptedFiles[0]);
      }
    };

    const onError = (err: Error) => {
      setErrorMessage(err.name);
    };

    const onDropRejected = (fileRejections: FileRejection[]) => {
      console.log(fileRejections);
      setErrorMessage('File format or size is not supported');
    };

    const rootClasses = clsx(
      size === 'md' && 'h-60 w-full max-w-md',
      size === 'lg' && 'h-60 w-full max-w-2xl',
      'relative',
    );

    const imageClasses = clsx(
      'object-center object-cover',
      imageType === 'circle' ? 'rounded-full' : 'rounded-xl',
      innerClass ? innerClass : 'h-full w-full',
    );

    const renderImage = () => {
      if (file) {
        return (
          <picture className={'flex h-full w-full justify-center'}>
            <img
              className={imageClasses}
              src={URL.createObjectURL(file)}
              id="output"
              alt="dropped-image"
              data-component={'dropzone-image'}
            />
          </picture>
        );
      } else if (Icon) {
        return (
          <Fragment>
            <Icon width="40" height="32" />

            {imageType !== 'circle' && (
              <p className="mt-5 text-center">
                Drag & drop file <br /> or <a className="text-secondary">browse media on your device</a>
              </p>
            )}
          </Fragment>
        );
      }

      return null;
    };

    const onClear = () => {
      setFile(null);
      onSubmit?.(file);
    };

    return (
      <Dropzone
        ref={ref}
        accept={acceptFile}
        maxSize={maxSize}
        multiple={false}
        onError={onError}
        onDropRejected={onDropRejected}
        onDrop={onDrop}
      >
        {({ getRootProps, getInputProps, isDragActive }) => {
          const fileImageClasses = clsx(
            'cursor-pointer hover:bg-neutral-10 object-cover object-center text-neutral/50 flex-col items-center justify-center border-2 border-dashed object-cover object-center p-1',
            isDragActive && 'bg-neutral-10',
            FileImageTypes[imageType],
            FileImageSizes[size],
            error
              ? 'border-accent-error bg-accent-error/20 hover:border-accent-error focus:border-accent-error'
              : 'border-neutral-darker',
            className,
          );

          return (
            <div className={rootClasses}>
              <div {...getRootProps()} className={fileImageClasses} data-component={'dropzone'}>
                <input {...getInputProps()} />
                {renderImage()}
              </div>
              <div
                className={clsx(!errorMessage && 'hidden', 'text-accent-error mt-2.5 px-3 text-xs font-normal')}
                data-component={'error-text'}
              >
                {errorMessage}
              </div>
              {imageType !== 'circle' && file && (
                <Button
                  size="sm"
                  className="bg-neutral-10 absolute right-3 top-3 border-2 border-white text-2xl opacity-75"
                  icon={CrossIcon}
                  onClick={onClear}
                  data-component={'clear-button'}
                />
              )}
            </div>
          );
        }}
      </Dropzone>
    );
  },
);

FileImage.displayName = NAME;
