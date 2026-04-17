import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TagsDisplay from '../TagsDisplay.jsx';

vi.mock('../../hooks/useTags', () => ({
    useTags: () => ({
        tags: { table_tags: [] },
        fetchTags: vi.fn(),
    }),
}));

describe('TagsDisplay', () => {

    it('displays the component title', () => {
        render(<TagsDisplay />);

        const titre = screen.getByRole('heading', { level: 2 });

        expect(titre).toBeInTheDocument();
    });

    it('displays a message when there are no tags', () => {
        render(<TagsDisplay />);

        const message = screen.getByText('Aucun tags pour le moment.');

        expect(message).toBeInTheDocument();
    });

});
