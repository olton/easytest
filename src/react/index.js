import { createRequire } from 'module';

global.require = createRequire(import.meta.url);

let React, ReactDOM, ReactTestUtils;

// Функція ініціалізації модуля
export const initReact = () => {
    try {
        // Динамічний імпорт React, щоб не вимагати його наявності 
        // для тих, хто не використовує React тестування
        React = require('react');
        ReactDOM = require('react-dom');
        ReactTestUtils = require('react-dom/test-utils');
        return true;
    } catch (error) {
        console.error(`Failed to initialize React testing: ${error.message}`);
        return false;
    }
};

// Утиліта для рендерингу компонентів
export const render = (Component, props = {}, container = null) => {
    if (!React || !ReactDOM) {
        throw new Error('React not initialized. Make sure to call initReact() first.');
    }

    // Якщо контейнер не передано, створюємо новий
    if (!container) {
        container = document.createElement('div');
        document.body.appendChild(container);
    }

    let element;
    if (React.isValidElement(Component)) {
        element = Component;
    } else {
        element = React.createElement(Component, props);
    }

    ReactDOM.render(element, container);

    return {
        container,
        unmount: () => ReactDOM.unmountComponentAtNode(container),
        rerender: (newProps) => {
            ReactDOM.render(React.createElement(Component, newProps), container);
        },
        // Допоміжні методи для пошуку елементів
        getByText: (text) => {
            const elements = Array.from(container.querySelectorAll('*'));
            return elements.find(el => el.textContent === text);
        },
        getAllByText: (text) => {
            const elements = Array.from(container.querySelectorAll('*'));
            return elements.filter(el => el.textContent === text);
        },
        getByTestId: (testId) => {
            return container.querySelector(`[data-testid="${testId}"]`);
        },
        // Допомога з подіями
        fireEvent: {
            click: (element) => {
                ReactTestUtils.act(() => {
                    element.click();
                });
            },
            change: (element, value) => {
                ReactTestUtils.act(() => {
                    element.value = value;
                    ReactTestUtils.Simulate.change(element);
                });
            }
        },
        debug: () => {
            console.log(container.innerHTML);
        }
    };
};

// Функція для створення snapshot тестів
export const snapshot = (rendered) => {
    return rendered.container.innerHTML;
};

// Функція для очищення після тестів
export const cleanup = () => {
    // Знаходимо всі додані контейнери і видаляємо їх
    const containers = document.querySelectorAll('[data-testid]');
    containers.forEach(container => {
        if (container.parentNode) {
            ReactDOM.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
        }
    });
};