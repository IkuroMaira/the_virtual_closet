import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TagsDisplay from '../TagsDisplay.jsx';

describe('TagsDisplay', () => {

    it('displays the component title', () => {
        render(<TagsDisplay />);

        const titre = screen.getByRole('heading');

        expect(titre).toBeInTheDocument();
    });

    it('displays a message when there are no tags', () => {
        render(<TagsDisplay />);

        const message = screen.getByText('Aucun tags pour le moment.');

        expect(message).toBeInTheDocument();
    });

});
