import React from 'react';
import '../../../styles/globalTypography.css';

const ReferenceTypography = () => {
  return (
    <div className="typography-container">
      <h1 className="h1">Heading 1</h1>
      <h2 className="h2">Heading 2</h2>
      <h3 className="h3">Heading 3</h3>
      <h4 className="h4">Heading 4</h4>
      <h5 className="h5">Heading 5</h5>
      <h6 className="h6">Heading 6</h6>
      <p className="p">This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p className="p small-text">This is a small text.</p>
      <p className="p"><a href="#" className="a">This is a link</a></p>
      <p className="p text-bold">This is bold text.</p>
      <p className="p text-italic">This is italic text.</p>
      <p className="p text-underline">This is underlined text.</p>
      <p className="p text-primary">This is primary colored text.</p>
      <p className="p text-secondary">This is secondary colored text.</p>
      <p className="p text-success">This is success colored text.</p>
      <p className="p text-danger">This is danger colored text.</p>
      <p className="p text-warning">This is warning colored text.</p>
      <p className="p text-info">This is info colored text.</p>
      <p className="p text-light">This is light colored text.</p>
      <p className="p text-dark">This is dark colored text.</p>
      <p className="p text-white" style={{ backgroundColor: '#343a40' }}>This is white colored text on dark background.</p>
      <p className="p text-left">This text is left aligned.</p>
      <p className="p text-center">This text is center aligned.</p>
      <p className="p text-right">This text is right aligned.</p>
      <p className="p text-large">This is large text.</p>
      <p className="p text-small">This is small text.</p>
    </div>
  );
};

export default ReferenceTypography;
