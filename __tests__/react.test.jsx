import {describe, it, expect, afterEach, waitFor } from '../src/index.js';

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

afterEach(() => {
    document.body.innerHTML = '';
});

describe('React Button (JSX)', () => {
    it('should render a button with text', async () => {
        const { container } = React.render(<Button text="Click me" />);

        await waitFor(100);

        const button = container.querySelector('button');

        expect(button).toBeHtmlElement();
        expect(button.textContent).toBe('Click me');
    });

    it('should handle click events', async () => {
        let clicked = false;

        const handleClick = () => {
            clicked = true;
        };

        const { container } = React.render(<Button text="Click me" onClick={handleClick} />);

        await waitFor(100);

        const button = container.querySelector('button');

        expect(button).toBeHtmlElement();

        button.click();

        expect(clicked).toBeTrue();
    });
});
