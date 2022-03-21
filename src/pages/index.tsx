import {
  ChangeEvent,
  useCallback,
  VFC,
  useRef,
  useState,
  useMemo,
  Fragment
} from 'react';
import styled from 'styled-components';
import { Stage, Layer, Shape } from 'react-konva';
import useImage from 'use-image';
import { Context } from 'konva/lib/Context';
import Konva from 'konva';
import Polygon from '../static/polygon.png';

const SIZE = 512;

export const IndexPage: VFC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [shapeImage] = useImage(Polygon, 'anonymous');
  const [image] = useImage(imageUrl, 'anonymous');
  const hasImage = useMemo(() => !!image && !!shapeImage, [image, shapeImage]);

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result as string);
    };

    reader.readAsDataURL(file);
  }, []);

  const onDownload = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const dataURL = stage.toDataURL();
    const link = document.createElement('a');
    link.download = 'nft.png';
    link.href = dataURL;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }, []);

  const sceneFunc = useCallback(
    (ctx: Context) => {
      if (!shapeImage || !image) {
        return;
      }

      ctx.drawImage(
        shapeImage,
        0,
        0,
        shapeImage.width,
        shapeImage.height,
        0,
        0,
        SIZE,
        SIZE
      );

      //@ts-expect-error: globalCompositeOperation
      ctx.globalCompositeOperation = 'source-in';

      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, SIZE, SIZE);
    },
    [shapeImage, image]
  );

  return (
    <Container ref={containerRef}>
      <div>
        <Title>六角形アイコン ジェネレーター</Title>
      </div>

      <div>
        ソースコード:{' '}
        <a
          href="https://github.com/nzws/what-is-nft"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/nzws/what-is-nft
        </a>
      </div>

      <div>
        <input type="file" accept="image/*" onChange={onFileChange} />
      </div>

      <StageContainer>
        {hasImage && (
          <Fragment>
            <button onClick={onDownload}>画像をダウンロード</button>

            <Stage width={SIZE} height={SIZE} ref={stageRef}>
              <Layer>
                <Shape sceneFunc={sceneFunc} width={SIZE} height={SIZE} />
              </Layer>
            </Stage>
          </Fragment>
        )}
      </StageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const StageContainer = styled.div`
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0;
`;
