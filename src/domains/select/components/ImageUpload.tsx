import { useState } from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';

import { IconImage, IconImageDelete } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_S } from 'styles/textStyles';

interface Props {
  setImages: React.Dispatch<React.SetStateAction<{ [num: number]: File | null }>>;
  num: number;
}

const ImageUpload = ({ setImages, num }: Props) => {
  const [previewImg, setPreviewImg] = useState<{ [num: number]: string }>({});

  //이미지 미리보기
  const encodeFile = (file: File, name: string) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(() => {
      reader.onload = () => {
        setPreviewImg((prev) => ({ ...prev, [Number(name)]: reader.result as string }));
      };
    });
  };

  //이미지 images에 담기
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const file = event.target.files && event.target.files[0];

    if (file) {
      //이미지 리사이징
      imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      }).then((compressedFile) => {
        //리사이징 후에 파일이 blob으로 바뀌므로 다시 파일로 변환해준다
        const newFile = new File([compressedFile], file.name, {
          type: file.type,
        });
        encodeFile(newFile, name);
        setImages((prev) => ({ ...prev, [Number(name)]: newFile }));
      });
    }
  };

  //이미지 삭제(previewImg, images에 담긴 이미지 모두 삭제해준다)
  const handlePreviewDelete = (payload: number) => {
    setPreviewImg((prev) => ({ ...prev, [payload]: '' }));
    setImages((prev) => ({ ...prev, [payload]: null }));
  };

  return (
    <>
      {previewImg[num] ? (
        <StPreviewContainer previewImg={previewImg[num]}>
          <div onClick={() => handlePreviewDelete(num)}>
            <IconImageDelete />
            <span>삭제</span>
          </div>
        </StPreviewContainer>
      ) : (
        <StLabelContainer>
          <input name={String(num)} hidden type="file" accept="image/*" onChange={handleFile} />
          <IconImage />
          <span>이미지 첨부(선택)</span>
        </StLabelContainer>
      )}
    </>
  );
};

export default ImageUpload;

const StPreviewContainer = styled.div<{ previewImg: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 15rem;
  margin-top: 2.8rem;
  border-radius: 2rem;

  background: url(${(props) => props.previewImg});
  background-size: cover;
  background-position: center center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    cursor: pointer;

    span {
      ${FONT_S};
      ${FONT_BOLD};
      line-height: 2rem;
      color: ${({ theme }) => theme.color.WHITE};
      text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
    }
  }
`;

const StLabelContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  cursor: pointer;

  span {
    ${FONT_S};
    ${FONT_BOLD};
    line-height: 2rem;
    color: ${({ theme }) => theme.color.SUB_1};
  }
`;
