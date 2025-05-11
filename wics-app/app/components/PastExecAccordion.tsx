"use client";
import "@/app/styles/accordion.scss";
import { useRef, useEffect } from "react";

interface Person {
  name: string;
  role: string;
}

interface AccordionProps {
  data: { title: string; imageUrl?: string; people: Person[] }[];
}

export const PastExecAccordion: React.FC<AccordionProps> = ({ data }) => {
  const previouslyOpenedPanelIndex = useRef<number>(-1);
  const panelsRef = useRef<Map<number, HTMLUListElement>>();

  function getIdPanelMap() {
    if (!panelsRef.current) {
      panelsRef.current = new Map();
    }
    return panelsRef.current;
  }

  function toggleAccordion(indexClicked: number) {
    const idPanelMap = getIdPanelMap();
    const previouslyOpenedNode = idPanelMap.get(
      previouslyOpenedPanelIndex.current,
    );
    const selectedNode = idPanelMap.get(indexClicked);

    if (!selectedNode) return;

    if (selectedNode.dataset.opened) {
      closePanel(selectedNode);
    } else {
      openPanel(selectedNode);
      if (
        previouslyOpenedNode &&
        previouslyOpenedPanelIndex.current !== indexClicked
      ) {
        closePanel(previouslyOpenedNode);
      }
    }
    previouslyOpenedPanelIndex.current = indexClicked;
  }

  function openPanel(node: HTMLUListElement) {
    node.style.maxHeight = `${node.scrollHeight}px`;
    node.dataset.opened = "true";
  }

  function closePanel(node: HTMLUListElement) {
    node.style.maxHeight = "0";
    delete node.dataset.opened;
  }

  // Handle image load and resize events
  useEffect(() => {
    const recalculateHeights = () => {
      const idPanelMap = getIdPanelMap();
      const currentlyOpenNode = idPanelMap.get(
        previouslyOpenedPanelIndex.current,
      );
      if (currentlyOpenNode?.dataset.opened) {
        openPanel(currentlyOpenNode);
      }
    };

    const images = document.querySelectorAll(".card-image");
    const resizeObserver = new ResizeObserver(recalculateHeights);

    images.forEach((img) => {
      img.addEventListener("load", recalculateHeights);
      if (img.complete) recalculateHeights();
      resizeObserver.observe(img);
    });

    window.addEventListener("resize", recalculateHeights);

    return () => {
      images.forEach((img) =>
        img.removeEventListener("load", recalculateHeights),
      );
      resizeObserver.disconnect();
      window.removeEventListener("resize", recalculateHeights);
    };
  }, [data]);

  // Open first panel on mount
  useEffect(() => {
    const idPanelMap = getIdPanelMap();
    const firstNode = idPanelMap.get(0);
    if (firstNode) {
      openPanel(firstNode);
      previouslyOpenedPanelIndex.current = 0;
    }
  }, []);

  return (
    <ul className="accordion">
      {data.map(({ title, people, imageUrl }, i) => (
        <li key={i} className="card">
          <button onClick={() => toggleAccordion(i)}>{title}</button>
          <ul
            className="card-body"
            ref={(node) => {
              const idPanelMap = getIdPanelMap();
              if (node) {
                idPanelMap.set(i, node);
              } else {
                idPanelMap.delete(i);
              }
            }}
          >
            <div className="content-container">
              <div className="card-content">
                {people.map((person, j) => (
                  <li key={j}>
                    <strong>{person.name}</strong>
                    {person.role && `, ${person.role}`}
                  </li>
                ))}
              </div>
              {imageUrl && (
                <div className="image-container">
                  <img
                    src={imageUrl}
                    alt={`${title} thumbnail`}
                    className="card-image"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default PastExecAccordion;
