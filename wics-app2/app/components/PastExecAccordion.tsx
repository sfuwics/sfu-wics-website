"use client";
import "@/app/styles/accordion.scss";
@use "@/app/styles/main";

import { useRef, useEffect } from "react";

interface Person {
  name: string;
  role: string;
}

interface TransformedData {
  name: string;
  imageUrl: string | undefined;
  content: JSX.Element[];
}

interface AccordionProps {
  data: { title: string; imageUrl?: string; people: Person[] }[];
}

export const PastExecAccordion: React.FC<AccordionProps> = ({ data }) => {
  const previouslyOpenedPanelIndex = useRef<number>(-1);
  const panelsRef = useRef<Map<number, HTMLUListElement>>();

  function getIdPanelMap(): Map<number, HTMLUListElement> {
    if (panelsRef.current) {
      return panelsRef.current;
    }
    panelsRef.current = new Map();
    return panelsRef.current;
  }

  function toggleAccordion(indexClicked: number): void {
    const idPanelMap = getIdPanelMap();
    const previouslyOpenedNode = idPanelMap.get(
      previouslyOpenedPanelIndex.current
    );
    const selectedNode = idPanelMap.get(indexClicked);

    if (!selectedNode) return;

    if (selectedNode?.dataset.hasOwnProperty("opened")) {
      closePanel(selectedNode);
    } else {
      openPanel(selectedNode);
      if (
        previouslyOpenedPanelIndex.current !== indexClicked &&
        previouslyOpenedPanelIndex.current !== undefined &&
        previouslyOpenedNode
      ) {
        closePanel(previouslyOpenedNode);
      }
    }
    previouslyOpenedPanelIndex.current = indexClicked;
  }

  function openPanel(node: HTMLUListElement): void {
    node.style.maxHeight = `${node.scrollHeight}px`;
    node.setAttribute("data-opened", "");
  }

  function closePanel(node: HTMLUListElement): void {
    node.style.maxHeight = "0";
    node.removeAttribute("data-opened");
  }

  // Transform data
  const transformedData: TransformedData[] = data.map((item) => ({
    name: item.title,
    imageUrl: item.imageUrl,
    content: item.people.map((person) => (
      <div key={person.name}>
        <strong>{person.name}</strong>
        {person.role && `, ${person.role}`}
      </div>
    )),
  }));

  // Open the first accordion panel on render
  useEffect(() => {
    const idPanelMap = getIdPanelMap();
    const firstNode = idPanelMap.get(0);
    if (firstNode) {
      openPanel(firstNode);
      previouslyOpenedPanelIndex.current = 0;
    }
  }, []); // Empty dependency array ensures this runs only once after mount

  return (
    <ul className="accordion">
      {transformedData.map(({ name, content, imageUrl }, i) => (
        <li key={i} className="card">
          <button onClick={() => toggleAccordion(i)}>{name}</button>
          <ul
            className="card-body"
            ref={(node) => {
              const idPanelMap = getIdPanelMap();
              if (node) {
                idPanelMap.set(i, node);
                return;
              }
              idPanelMap.delete(i);
            }}
          >
            <div className="content-container">
              <div className="card-content">
                {content.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </div>
              {imageUrl && (
                <div className="image-container">
                  <img
                    src={imageUrl}
                    alt={`${name} thumbnail`}
                    className="card-image"
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
