"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RobotScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SCENE & CAMERA ---
        const scene = new THREE.Scene();
        // Fog for depth blending
        scene.fog = new THREE.FogExp2(0xffffff, 0.02);

        const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100);
        camera.position.set(0, 0.5, 5.5); // Closer, slightly angled up

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        containerRef.current.appendChild(renderer.domElement);

        // --- LIGHTING (Studio Setup) ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        scene.add(mainLight);

        const fillLight = new THREE.PointLight(0x2563EB, 0.8); // Blue fill
        fillLight.position.set(-5, 0, 5);
        scene.add(fillLight);

        const rimLight = new THREE.SpotLight(0x00ffff, 2);
        rimLight.position.set(0, 5, -5);
        rimLight.lookAt(0, 0, 0);
        scene.add(rimLight);

        // --- MATERIALS ---
        // 1. Glossy White Plastic/Ceramic
        const armorMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.2,
            metalness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
        });

        // 2. Dark Joint Material
        const jointMat = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 0.5,
            metalness: 0.5,
        });

        // 3. Visor Screen (Dynamic Canvas Texture)
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const texture = new THREE.CanvasTexture(canvas);
        
        const visorMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            roughness: 0.0,
            metalness: 0.5,
            emissive: 0xffffff,
            emissiveMap: texture,
            emissiveIntensity: 1.5,
        });

        // --- ROBOT CONSTRUCTION ---
        const robotGroup = new THREE.Group();
        scene.add(robotGroup);

        // --- TORSO ---
        const torsoGroup = new THREE.Group();
        robotGroup.add(torsoGroup);

        // Chest Unit (Rounded Box)
        // Creating a smooth chest shape
        const chestGeo = new THREE.CylinderGeometry(0.6, 0.45, 0.9, 32);
        chestGeo.scale(1.5, 1, 0.8);
        const chestMesh = new THREE.Mesh(chestGeo, armorMat);
        chestMesh.position.y = 0.2;
        chestMesh.castShadow = true;
        torsoGroup.add(chestMesh);

        // Shoulder Pads (Spheres)
        const shoulderGeo = new THREE.SphereGeometry(0.45, 32, 32);
        const leftShoulder = new THREE.Mesh(shoulderGeo, armorMat);
        leftShoulder.position.set(-1.0, 0.5, 0);
        leftShoulder.scale.set(1, 0.9, 1);
        torsoGroup.add(leftShoulder);

        const rightShoulder = new THREE.Mesh(shoulderGeo, armorMat);
        rightShoulder.position.set(1.0, 0.5, 0);
        rightShoulder.scale.set(1, 0.9, 1);
        torsoGroup.add(rightShoulder);

        // Neck
        const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.3), jointMat);
        neckMesh.position.y = 0.7;
        torsoGroup.add(neckMesh);

        // --- HEAD GROUP ---
        const headGroup = new THREE.Group();
        headGroup.position.y = 0.9;
        torsoGroup.add(headGroup);

        // Head Shell (Helmet)
        const helmetGeo = new THREE.SphereGeometry(0.65, 64, 64);
        helmetGeo.scale(1, 0.85, 1); 
        const helmetMesh = new THREE.Mesh(helmetGeo, armorMat);
        helmetMesh.castShadow = true;
        headGroup.add(helmetMesh);

        // Visor Screen
        // We cut the front of the sphere or overlay a curved surface
        const visorGeo = new THREE.SphereGeometry(0.56, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.32);
        visorGeo.rotateX(-Math.PI / 2);
        visorGeo.scale(1, 0.6, 1);
        visorGeo.translate(0, 0.05, 0.24);
        const visorMesh = new THREE.Mesh(visorGeo, visorMat);
        headGroup.add(visorMesh);

        // Ear muffs
        const earGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
        earGeo.rotateZ(Math.PI / 2);
        const leftEar = new THREE.Mesh(earGeo, armorMat);
        leftEar.position.set(-0.62, 0, 0);
        headGroup.add(leftEar);
        const rightEar = new THREE.Mesh(earGeo, armorMat);
        rightEar.position.set(0.62, 0, 0);
        headGroup.add(rightEar);

        // --- ARMS ---
        
        // LEFT ARM (Resting on side/hip)
        const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.7, 16);
        const leftUpperArm = new THREE.Group();
        leftUpperArm.position.set(-1.0, 0.5, 0);
        torsoGroup.add(leftUpperArm);
        
        const leftUpperArmMesh = new THREE.Mesh(armGeo, armorMat);
        leftUpperArmMesh.position.y = -0.35;
        leftUpperArm.add(leftUpperArmMesh);

        // Left Elbow Joint
        const elbowGeo = new THREE.SphereGeometry(0.15);
        const leftElbow = new THREE.Group();
        leftElbow.position.y = -0.7;
        leftUpperArm.add(leftElbow);
        leftElbow.add(new THREE.Mesh(elbowGeo, jointMat));

        // Left Forearm
        const leftForearmMesh = new THREE.Mesh(armGeo, armorMat);
        leftForearmMesh.position.y = -0.35;
        leftElbow.add(leftForearmMesh);

        // Left Hand
        const handGeo = new THREE.BoxGeometry(0.2, 0.25, 0.1);
        const leftHand = new THREE.Mesh(handGeo, armorMat);
        leftHand.position.y = -0.8;
        leftElbow.add(leftHand);

        // Pose Left Arm
        leftUpperArm.rotation.z = Math.PI / 8; // Flare out slightly
        leftElbow.rotation.x = -Math.PI / 4; // Bent forward slightly
        
        // RIGHT ARM (Waving)
        const rightUpperArm = new THREE.Group();
        rightUpperArm.position.set(1.0, 0.5, 0);
        torsoGroup.add(rightUpperArm);

        const rightUpperArmMesh = new THREE.Mesh(armGeo, armorMat);
        rightUpperArmMesh.position.y = -0.35;
        rightUpperArm.add(rightUpperArmMesh);

        const rightElbow = new THREE.Group();
        rightElbow.position.y = -0.7;
        rightUpperArm.add(rightElbow);
        rightElbow.add(new THREE.Mesh(elbowGeo, jointMat));

        const rightForearm = new THREE.Mesh(armGeo, armorMat);
        rightForearm.position.y = -0.35;
        rightElbow.add(rightForearm);

        // Detailed Hand for Waving
        const rightHandGroup = new THREE.Group();
        rightHandGroup.position.y = -0.75;
        rightElbow.add(rightHandGroup);

        // Palm
        const palmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.3, 0.1), armorMat);
        rightHandGroup.add(palmMesh);

        // Fingers (Simple capsules)
        const fingerGeo = new THREE.CapsuleGeometry(0.04, 0.15);
        
        // 4 Fingers
        for(let i=0; i<4; i++) {
            const finger = new THREE.Mesh(fingerGeo, armorMat);
            finger.position.set(-0.09 + (i * 0.06), 0.25, 0);
            rightHandGroup.add(finger);
        }
        // Thumb
        const thumb = new THREE.Mesh(fingerGeo, armorMat);
        thumb.position.set(0.15, 0.0, 0);
        thumb.rotation.z = -Math.PI / 4;
        rightHandGroup.add(thumb);
        
        // --- ANIMATION STATE ---
        let time = 0;
        let scrollX = 0;

        // --- MOUSE HANDLER ---
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Normalize mouse position relative to center of the container
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            mouseRef.current = { x, y };
        };

        window.addEventListener("mousemove", handleMouseMove);

        // --- RENDER CLOCK ---
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.02;

            // 1. TEXT ANIMATION (Scrolling on Visor)
            if (ctx) {
                // Clear background
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw Text
                const text = "Welcome to aashita.ai  ●  ";
                ctx.font = 'bold 120px Arial';
                ctx.fillStyle = '#00ffff'; 
                ctx.textBaseline = 'middle';
                
                // Scroll Loop
                scrollX -= 4; // Speed
                if (scrollX < -ctx.measureText(text).width) {
                    scrollX = canvas.width;
                }
                
                // Draw twice for seamless loop if needed, but simple ticker is fine
                // Just draw scrolling text
                ctx.fillText(text, scrollX, canvas.height / 2);
                
                // Add some static lines/grid for tech feel
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(0, 40); ctx.lineTo(1024, 40);
                ctx.moveTo(0, 216); ctx.lineTo(1024, 216);
                ctx.stroke();

                texture.needsUpdate = true;
            }

            // 2. HEAD TRACKING
            // Smooth lerp towards mouse
            const targetX = mouseRef.current.y * 0.5;
            const targetY = -mouseRef.current.x * 0.6;
            
            headGroup.rotation.x += (targetX - headGroup.rotation.x) * 0.1;
            headGroup.rotation.y += (targetY - headGroup.rotation.y) * 0.1;

            // 3. BODY IDLE FLOAT
            robotGroup.position.y = Math.sin(time * 0.5) * 0.05 - 0.1;

            // 4. WAVE ANIMATION
            // Raise Arm
            rightUpperArm.rotation.z = Math.PI * 0.8; // Arm raised up
            rightUpperArm.rotation.x = Math.sin(time * 0.5) * 0.1; // Subtle drift

            // Bend Elbow
            rightElbow.rotation.z = Math.PI * 0.1; 

            // Waving Hand
            // Wave movement primarily comes from forearm rotation or elbow bend
            // Let's rotate the forearm back and forth
            rightElbow.rotation.x = Math.sin(time * 3) * 0.3 - 0.2; // Waving motion
            rightHandGroup.rotation.z = Math.sin(time * 3 + 1) * 0.1; // Hand wrist flex

            // Left arm Idle
            leftUpperArm.rotation.z = 0.2 + Math.sin(time) * 0.02;

            renderer.render(scene, camera);
        };

        animate();

        // --- CLEANUP ---
        const handleResize = () => {
             if (!containerRef.current) return;
             camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
             camera.updateProjectionMatrix();
             renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            // Dispose
            armorMat.dispose();
            jointMat.dispose();
            visorMat.dispose();
            texture.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[400px]" />
    );
}
