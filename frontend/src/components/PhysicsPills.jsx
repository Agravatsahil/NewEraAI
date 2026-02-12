import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const labels = [
  { text: "AI Healthcare", color: "#0F172A", textColor: "#FFFFFF" },
  { text: "Ethics in AI", color: "#FB7185", textColor: "#FFFFFF" },
  { text: "Creative Writing", color: "#3B82F6", textColor: "#FFFFFF" },
  { text: "AI Education", color: "#F59E0B", textColor: "#FFFFFF" },
  { text: "AI Gaming", color: "#6B7280", textColor: "#FFFFFF" },
  { text: "AI in Business", color: "#60A5FA", textColor: "#FFFFFF" },
  { text: "Developments", color: "#06B6D4", textColor: "#FFFFFF" },
];

const PhysicsPills = ({ height = 260 }) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      World,
      Bodies,
      Body,
      Mouse,
      MouseConstraint,
      Events,
      Composite,
    } = Matter;

    // ENGINE
    const engine = Engine.create();
    engine.gravity.y = 1.1;
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;

    // RENDER
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    });

    // BOUNDS
    const wallSize = 80;
    const ground = Bodies.rectangle(width / 2, height + wallSize / 2, width, wallSize, {
      isStatic: true,
      render: { visible: false },
    });

    const leftWall = Bodies.rectangle(-wallSize / 2, height / 2, wallSize, height, {
      isStatic: true,
      render: { visible: false },
    });

    const rightWall = Bodies.rectangle(width + wallSize / 2, height / 2, wallSize, height, {
      isStatic: true,
      render: { visible: false },
    });

    World.add(engine.world, [ground, leftWall, rightWall]);

    // CREATE PILLS
    const pills = labels.map((item, i) => {
      const fontSize = 13;
      const padX = 16;
      const padY = 10;
      const textWidth = item.text.length * 7;
      const pillW = textWidth + padX * 2;
      const pillH = fontSize + padY * 2;

      const body = Bodies.rectangle(
        40 + Math.random() * (width - 80),
        -80 - i * 40,
        pillW,
        pillH,
        {
          chamfer: { radius: 10 },
          restitution: 0.2,
          friction: 0.15,
          frictionAir: 0.02,
          render: {
            fillStyle: item.color,
          },
        }
      );

      Body.setAngle(body, (-0.25 + Math.random() * 0.5));

      body.plugin = {
        text: item.text,
        textColor: item.textColor,
        fontSize,
      };

      return body;
    });

    World.add(engine.world, pills);

    // MOUSE DRAG
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);

    // TEXT RENDER (FIXED)
    const drawText = () => {
      const ctx = render.context;

      Composite.allBodies(engine.world).forEach((body) => {
        if (!body.plugin?.text) return;

        ctx.save();

        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        ctx.font = `600 ${body.plugin.fontSize}px Inter, system-ui`;
        ctx.fillStyle = body.plugin.textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.shadowColor = "rgba(0,0,0,0.25)";
        ctx.shadowBlur = 2;

        ctx.fillText(body.plugin.text, 0, 0);

        ctx.restore();
      });
    };

    Events.on(render, "afterRender", drawText);

    // RUN
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // CLEANUP
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [height]);

  return (
    <div
      ref={sceneRef}
      style={{
        width: "100%",
        height,
        overflow: "hidden",
      }}
    />
  );
};

export default PhysicsPills;
