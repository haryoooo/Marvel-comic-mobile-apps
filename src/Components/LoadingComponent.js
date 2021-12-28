import React from 'react';
import {View, Text} from 'react-native';
import ContentLoader, {Circle} from 'react-content-loader/native';

export default function LoadingComponent() {
  return (
    <ContentLoader
      viewBox="0 0 400 160"
      height={160}
      width={400}
      backgroundColor="grey"
      foregroundColor="#ecebeb">
      <Circle cx="150" cy="86" r="8" />
      <Circle cx="194" cy="86" r="8" />
      <Circle cx="238" cy="86" r="8" />
    </ContentLoader>
  );
}
