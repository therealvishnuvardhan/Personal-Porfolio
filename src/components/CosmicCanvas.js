"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CosmicCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const fillBar = document.getElementById("progress-fill");
        const counter = document.getElementById("section-counter");
        const sideMenuText = document.querySelector(".vertical-text");

        const smoothCameraPos = { x: 0, y: 30, z: 300 };
        const totalSections = 2;
        let locations = [];
        let isReady = false;

        const refs = {
            scene: null,
            camera: null,
            renderer: null,
            composer: null,
            stars: [],
            nebula: null,
            mountains: [],
            atmosphere: null,
            animationId: null,
            targetCameraX: 0,
            targetCameraY: 30,
            targetCameraZ: 300
        };

        const initThree = () => {
            // Scene setup
            refs.scene = new THREE.Scene();
            refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

            // Camera
            refs.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                2000
            );
            refs.camera.position.z = 300;
            refs.camera.position.y = 30;

            // Renderer
            refs.renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true
            });
            refs.renderer.setSize(window.innerWidth, window.innerHeight);
            refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            refs.renderer.toneMappingExposure = 0.5;

            // Post-processing
            refs.composer = new EffectComposer(refs.renderer);
            const renderPass = new RenderPass(refs.scene, refs.camera);
            refs.composer.addPass(renderPass);

            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                0.8,
                0.4,
                0.85
            );
            refs.composer.addPass(bloomPass);

            // Create scene elements
            createStarField();
            createNebula();
            createMountains();
            createAtmosphere();
            
            // Get mountain Z coords
            locations = refs.mountains.map(m => m.position.z);

            // Start animation
            animate();
            
            isReady = true;
        };

        const createStarField = () => {
            const starCount = 5000;
            
            for (let i = 0; i < 3; i++) {
                const geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(starCount * 3);
                const colors = new Float32Array(starCount * 3);
                const sizes = new Float32Array(starCount);

                for (let j = 0; j < starCount; j++) {
                    const radius = 200 + Math.random() * 800;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(Math.random() * 2 - 1);

                    positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
                    positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                    positions[j * 3 + 2] = radius * Math.cos(phi);

                    // Color variation
                    const color = new THREE.Color();
                    const colorChoice = Math.random();
                    if (colorChoice < 0.7) {
                        color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
                    } else if (colorChoice < 0.9) {
                        color.setHSL(0.08, 0.5, 0.8);
                    } else {
                        color.setHSL(0.6, 0.5, 0.8);
                    }
                    
                    colors[j * 3] = color.r;
                    colors[j * 3 + 1] = color.g;
                    colors[j * 3 + 2] = color.b;

                    sizes[j] = Math.random() * 2 + 0.5;
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 },
                        depth: { value: i }
                    },
                    vertexShader: `
                        attribute float size;
                        attribute vec3 color;
                        varying vec3 vColor;
                        uniform float time;
                        uniform float depth;
                        
                        void main() {
                            vColor = color;
                            vec3 pos = position;
                            
                            // Slow rotation based on depth
                            float angle = time * 0.05 * (1.0 - depth * 0.3);
                            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
                            pos.xy = rot * pos.xy;
                            
                            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                            gl_PointSize = size * (300.0 / -mvPosition.z);
                            gl_Position = projectionMatrix * mvPosition;
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vColor;
                        
                        void main() {
                            float dist = length(gl_PointCoord - vec2(0.5));
                            if (dist > 0.5) discard;
                            
                            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
                            gl_FragColor = vec4(vColor, opacity);
                        }
                    `,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                });

                const starsPoints = new THREE.Points(geometry, material);
                refs.scene.add(starsPoints);
                refs.stars.push(starsPoints);
            }
        };

        const createNebula = () => {
            const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color1: { value: new THREE.Color(0x0033ff) },
                    color2: { value: new THREE.Color(0xff0066) },
                    opacity: { value: 0.3 }
                },
                vertexShader: `
                    varying vec2 vUv;
                    varying float vElevation;
                    uniform float time;
                    
                    void main() {
                        vUv = uv;
                        vec3 pos = position;
                        
                        float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
                        pos.z += elevation;
                        vElevation = elevation;
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 color1;
                    uniform vec3 color2;
                    uniform float opacity;
                    uniform float time;
                    varying vec2 vUv;
                    varying float vElevation;
                    
                    void main() {
                        float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
                        vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
                        
                        float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
                        alpha *= 1.0 + vElevation * 0.01;
                        
                        gl_FragColor = vec4(color, alpha);
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            const nebulaMesh = new THREE.Mesh(geometry, material);
            nebulaMesh.position.z = -1050;
            refs.scene.add(nebulaMesh);
            refs.nebula = nebulaMesh;
        };

        const createMountains = () => {
            const layers = [
                { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
                { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
                { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
                { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
            ];

            layers.forEach((layer, index) => {
                const points = [];
                const segments = 50;
                
                for (let i = 0; i <= segments; i++) {
                    const x = (i / segments - 0.5) * 1000;
                    const y = Math.sin(i * 0.1) * layer.height + 
                             Math.sin(i * 0.05) * layer.height * 0.5 +
                             Math.random() * layer.height * 0.2 - 100;
                    points.push(new THREE.Vector2(x, y));
                }
                
                points.push(new THREE.Vector2(5000, -300));
                points.push(new THREE.Vector2(-5000, -300));

                const shape = new THREE.Shape(points);
                const geometry = new THREE.ShapeGeometry(shape);
                const material = new THREE.MeshBasicMaterial({
                    color: layer.color,
                    transparent: true,
                    opacity: layer.opacity,
                    side: THREE.DoubleSide
                });

                const mountain = new THREE.Mesh(geometry, material);
                mountain.position.z = layer.distance;
                mountain.position.y = layer.distance;
                mountain.userData = { baseZ: layer.distance, index };
                refs.scene.add(mountain);
                refs.mountains.push(mountain);
            });
        };

        const createAtmosphere = () => {
            const geometry = new THREE.SphereGeometry(600, 32, 32);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    opacity: { value: 1.0 }
                },
                vertexShader: `
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        vPosition = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    uniform float time;
                    uniform float opacity;
                    
                    void main() {
                        float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                        vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
                        
                        float pulse = sin(time * 2.0) * 0.1 + 0.9;
                        atmosphere *= pulse;
                        
                        gl_FragColor = vec4(atmosphere, intensity * 0.25 * opacity);
                    }
                `,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });

            const atmosphereMesh = new THREE.Mesh(geometry, material);
            refs.scene.add(atmosphereMesh);
            refs.atmosphere = atmosphereMesh;
        };

        const animate = () => {
            refs.animationId = requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;

            // Update stars
            refs.stars.forEach((starField) => {
                if (starField.material.uniforms) {
                    starField.material.uniforms.time.value = time;
                }
            });

            // Update nebula with opacity fade
            let nebulaOpacity = 0.3;
            let atmosphereOpacity = 1.0;
            if (refs.camera) {
                const camZ = refs.camera.position.z;
                
                // Nebula fade
                if (camZ < 150 && camZ > -250) {
                    const t = (camZ - (-250)) / 400; // t goes from 1 to 0
                    nebulaOpacity = 0.3 * Math.max(0, Math.min(1, t));
                } else if (camZ <= -250) {
                    nebulaOpacity = 0;
                }
                
                // Atmosphere fade
                if (camZ < 250 && camZ > -100) {
                    const t = (camZ - (-100)) / 350; // t goes from 1 to 0
                    atmosphereOpacity = Math.max(0, Math.min(1, t));
                } else if (camZ <= -100) {
                    atmosphereOpacity = 0;
                }
            }
            if (refs.nebula && refs.nebula.material.uniforms) {
                refs.nebula.material.uniforms.time.value = time * 0.5;
                refs.nebula.material.uniforms.opacity.value = nebulaOpacity;
            }
            if (refs.atmosphere && refs.atmosphere.material.uniforms && refs.atmosphere.material.uniforms.opacity) {
                refs.atmosphere.material.uniforms.opacity.value = atmosphereOpacity;
            }

            // Smooth camera movement
            if (refs.camera) {
                const smoothingFactor = 0.05;
                smoothCameraPos.x += (refs.targetCameraX - smoothCameraPos.x) * smoothingFactor;
                smoothCameraPos.y += (refs.targetCameraY - smoothCameraPos.y) * smoothingFactor;
                smoothCameraPos.z += (refs.targetCameraZ - smoothCameraPos.z) * smoothingFactor;
                
                const floatX = Math.sin(time * 0.1) * 2;
                const floatY = Math.cos(time * 0.15) * 1;
                
                refs.camera.position.x = smoothCameraPos.x + floatX;
                refs.camera.position.y = smoothCameraPos.y + floatY;
                refs.camera.position.z = smoothCameraPos.z;
                refs.camera.lookAt(0, 10, -600);
            }

            // Parallax mountains with fade
            refs.mountains.forEach((mountain, i) => {
                const parallaxFactor = 1 + i * 0.5;
                mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
                mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
                
                const baseOpacity = [1, 0.8, 0.6, 0.4][i];
                let fade = 1;
                if (refs.camera) {
                    const camZ = refs.camera.position.z;
                    const mountainZ = mountain.position.z;
                    const dist = camZ - mountainZ;
                    if (dist < 100 && dist > -50) {
                        fade = Math.max(0, Math.min(1, (dist - (-50)) / 150));
                    } else if (dist <= -50) {
                        fade = 0;
                    }
                }
                mountain.material.opacity = baseOpacity * fade;
            });

            if (refs.composer) {
                refs.composer.render();
            }
        };

        // Initialize scene
        initThree();

        // Handle Scroll Events
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;
            
            const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
            
            if (fillBar) fillBar.style.width = `${progress * 100}%`;
            
            const currentProgress = progress * totalSections;
            const sectionIndex = Math.min(Math.floor(currentProgress), totalSections - 1);
            const sectionProgress = currentProgress % 1;
            
            // Format counter
            if (counter) counter.innerText = `${String(sectionIndex).padStart(2, "0")} / ${String(totalSections).padStart(2, "0")}`;
            
            // Section menu names
            const sectionNames = ["PORTFOLIO", "ABOUT", "PROJECTS"];
            if (sideMenuText) sideMenuText.innerText = sectionNames[sectionIndex] || "PORTFOLIO";

            // Camera target paths
            const cameraPositions = [
                { x: 0, y: 30, z: 300 },   // Horizon
                { x: 0, y: 40, z: -50 },   // Cosmos
                { x: 0, y: 50, z: -700 }   // Infinity
            ];

            const currentPos = cameraPositions[sectionIndex] || cameraPositions[0];
            const nextPos = cameraPositions[sectionIndex + 1] || currentPos;

            // Interpolate camera positions
            refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
            refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
            refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

            // Mountain depth parallax based on scroll
            refs.mountains.forEach((mountain, i) => {
                if (progress > 0.7) {
                    mountain.position.z = 600000; // push away
                } else {
                    mountain.position.z = locations[i]; // keep at default base Z
                }
            });

            if (refs.nebula && refs.mountains[3]) {
                refs.nebula.position.z = refs.mountains[3].position.z;
            }
        };

        const handleResize = () => {
            if (refs.camera && refs.renderer && refs.composer) {
                refs.camera.aspect = window.innerWidth / window.innerHeight;
                refs.camera.updateProjectionMatrix();
                refs.renderer.setSize(window.innerWidth, window.innerHeight);
                refs.composer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        handleScroll();

        // Intro Animations via GSAP
        const introTimeline = gsap.timeline();
        introTimeline.from("#side-menu", {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        introTimeline.from(".hero-title", {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        }, "-=0.6");

        introTimeline.from(".hero-subtitle", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.8");

        introTimeline.from(".hero-contact-row span", {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.6");

        introTimeline.from(".hero-btns", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");
        
        introTimeline.from("#scroll-progress", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            if (refs.animationId) {
                cancelAnimationFrame(refs.animationId);
            }
            
            // Dispose Three.js objects
            if (refs.renderer) {
                refs.renderer.dispose();
            }
            
            // Dispose stars, nebula, mountains, atmosphere
            refs.stars.forEach(starField => {
                starField.geometry.dispose();
                starField.material.dispose();
            });
            if (refs.nebula) {
                refs.nebula.geometry.dispose();
                refs.nebula.material.dispose();
            }
            refs.mountains.forEach(mountain => {
                mountain.geometry.dispose();
                mountain.material.dispose();
            });
            if (refs.atmosphere) {
                refs.atmosphere.geometry.dispose();
                refs.atmosphere.material.dispose();
            }
        };
    }, []);

    return <canvas ref={canvasRef} id="three-canvas" className="hero-canvas" />;
}
