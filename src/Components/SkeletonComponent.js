import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import {View, Text} from 'react-native';

export default function SkeletonComponent() {
  return (
    <View>
      <ContentLoader
        speed={2}
        width={1366}
        height={350}
        viewBox="0 0 1350 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="12" y="12" rx="0" ry="0" width="180" height="250" />
        <Rect x="200" y="12" rx="0" ry="0" width="180" height="250" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        width={1366}
        height={300}
        viewBox="0 0 1350 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="12" y="12" rx="0" ry="0" width="180" height="250" />
        <Rect x="200" y="12" rx="0" ry="0" width="180" height="250" />
      </ContentLoader>
    </View>
  );
}
