"use client";
import { gsap } from "gsap";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { roughness } from "three/tsl";


export default function Shapes() {
    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span md:col-start-2 md:mt-0">
            <Canvas className="z-0" shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}>
                <Suspense fallback={null}>
                    <Geometries />
                    <ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={40} blur={1} far={9} />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    )
}

function Geometries() {
    const geometries = [
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.IcosahedronGeometry(3) // Icosahedron
        }
    ];

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color: 0x2C3A47, roughness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x2C3A47, roughness: 1, metalness: 1 })
    ];

    const soundEffects = [
        new Audio("./laser7.ogg"),
        new Audio("./laser8.ogg"),
        new Audio("./laser9.ogg")
    ]

    return geometries.map(({ position, r, geometry }) => (
        <Geometry
            key={JSON.stringify(position)}
            position={position.map((p) => p * 2)}
            soundEffects={soundEffects}
            geometry={geometry}
            materials={materials}
            r={r}
        />
    ));

}

function Geometry({ r, position, geometry, materials, soundEffects }) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(false);

    const startingMaterial = getRandomMaterial();

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }

    function handleClick(e) {
        const mesh = e.object;

        gsap.utils.random(soundEffects).play();

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 2)}`,
            y: `+=${gsap.utils.random(0, 2)}`,
            z: `+=${gsap.utils.random(0, 2)}`,
            duration: 1.3,
            ease: "elastic.out(1, 0.3)",
            yoyo: true,
            speed: 3
        });

        mesh.material = getRandomMaterial();
    }

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    }

    const handlePointerOut = () => {
        document.body.style.cursor = "default";
    }

    useEffect(() => {
        let ctx = gsap.context(() => {
            setVisible(true);
            gsap.from(meshRef.current.scale, {
                x: 0, y: 0, z: 0,
                duration: 1,
                ease: "elastic.out(1,0.3)",
                delay: 0.6,
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <group position={position} ref={meshRef}>
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                <mesh geometry={geometry}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    visible={visible}
                    material={startingMaterial} />
            </Float>
        </group>
    )
}