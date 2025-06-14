import React from 'react';
import styles from "./Card.module.css";

interface CardProps {
  icon?: React.ReactNode;      
  title: string;               
  description: string;         
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardDesc}>{description}</div>
    </div>
  );
};

export default Card;