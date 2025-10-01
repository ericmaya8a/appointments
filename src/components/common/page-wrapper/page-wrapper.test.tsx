import { render, screen } from '@testing-library/react';

import { PageWrapper } from './page-wrapper';

describe('PageWrapper', () => {
  it('should render the component', () => {
    render(<PageWrapper>Children here</PageWrapper>);

    expect(screen.getByText(/children here/i)).toBeInTheDocument();
  });

  it('should render the component with correct clasName', () => {
    render(
      <PageWrapper className="bg-red-700 text-white" data-testid="page-wrapper">
        Children
      </PageWrapper>,
    );

    expect(screen.getByTestId('page-wrapper')).toHaveClass(
      'h-[calc(100dvh-68px)] bg-red-700 text-white',
    );
    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });
});
