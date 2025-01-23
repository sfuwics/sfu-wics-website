"use client";

import { useRef } from "react";
import "@/app/styles/accordian.scss";
@use "@/app/styles/main";

interface Person {
  name: string;
  role: string;
}

interface RawData {
  title: string;
  people: Person[];
}

interface TransformedData {
  name: string;
  content: string[];
}

interface AccordionProps {
  data: RawData[]; // Accepts raw data structure
}

export const PastExecAccordion: React.FC<AccordionProps> = ({ data }) => {
  const previouslyOpenedPanelIndex = useRef<number>(-1);
  const panelsRef = useRef<Map<number, HTMLUListElement>>();

  // Transform raw data into the format required for rendering
  const transformedData: TransformedData[] = data.map((item) => ({
  name: item.title,
  content: item.people.map((person) => (
    <span key={person.name}>
      <strong>{person.name}</strong>, {person.role}
    </span>
  )),
}));

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

    if (selectedNode === undefined) {
      return;
    }

    if (selectedNode?.dataset.hasOwnProperty("opened")) {
      closePanel(selectedNode);
    } else {
      openPanel(selectedNode);
      if (
        previouslyOpenedPanelIndex.current !== indexClicked &&
        previouslyOpenedPanelIndex.current !== undefined &&
        previouslyOpenedNode !== undefined
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

  return (
    <ul className="accordion">
      {transformedData.map(({ name, content }, i) => (
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
            {content.map((bulletPoint, j) => (
              <li key={j}>{bulletPoint}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default PastExecAccordion;
