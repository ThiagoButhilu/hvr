import React from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { CompassPlugin } from '@photo-sphere-viewer/compass-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/compass-plugin/index.css';

import door from '../assets/image/door_12602706.png'
import pin from '../assets/image/9313403.png';

interface PanoramaViewerProps {
    panoramaUrl: string;
    height?: string;
    width?: string;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
    panoramaUrl,
    height = '100vh',
    width = '100%'
}) => {
    const plugins = [
        [MarkersPlugin, {
            markers: [
                {
                    id: 'entrada',
                    position: { yaw: "160deg", pitch: "0deg" },
                    tooltip: "Entrada da Casa",
                    content: "Porta Principal",
                    size: { width: 50, height: 50 }, // Adicionado tamanho
                    image: door, // Adicionado imagem
                },
                {
                    id: 'sala',
                    position: { yaw: "0deg", pitch: "0deg" },
                    tooltip: "Sala de Estar",
                    content: "Área de Lazer",
                    size: { width: 50, height: 50 }, // Adicionado tamanho
                    image: pin, // Adicionado imagem
                },
            ],
        }],
        [CompassPlugin, {
            hotspots: [
                { yaw: "0deg" },
                { yaw: "90deg" },
                { yaw: "180deg" },
                { yaw: "270deg" },
            ],
        }],
    ].map(([plugin, config]) => [plugin, config]) as [any, any][];

    return (
        <div style={{ height, width }}>
            <ReactPhotoSphereViewer
                src={panoramaUrl}
                height={height}
                width={width}
                plugins={plugins as any}
                littlePlanet={false}
                navbar={true}
                onPositionChange={(lat, lng) => {
                    console.log(`Posição atual: latitude=${lat}, longitude=${lng}`);
                }}
            />
        </div>
    );
};

export default PanoramaViewer;