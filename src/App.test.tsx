import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Root from '@/routes/root/root';

describe('Root', () => {
  it('renders without crashing', () => {
    render(<Root />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World');
  });
});
