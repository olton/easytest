import { createRequire } from 'module';

global.require = createRequire(import.meta.url);

let React, ReactDOM, ReactTestUtils;

// Функція ініціалізації модуля
export const initReact = () => {
    try {
        // Динамічний імпорт React, щоб не вимагати його наявності 
        // для тих, хто не використовує React тестування
        React = require('react');
        ReactDOM = require('react-dom/client');
        ReactTestUtils = require('react-dom/test-utils');

        global.React = React;
        global.ReactDOM = ReactDOM;
        global.ReactTestUtils = ReactTestUtils;
        
        return true;
    } catch (error) {
        console.error(`Failed to initialize React: ${error.message}`);
        return false;
    }
};

// Утиліта для рендерингу компонентів
export const render = async (Component, props = {}, container = null) => {
    
    if (!React || !ReactDOM) {
        throw new Error('React not initialized. Make sure to call initReact() first.');
    } else {
        // console.log(`🤖 Found React version: ${React.version}`);
        // console.log(`🤖 Found ReactDOM version: ${ReactDOM.version}`);
    }

    // Якщо контейнер не передано, створюємо новий
    if (!container) {
        container = document.createElement('div');
        document.body.appendChild(container);
    }

    // Перевірка, чи є createRoot в ReactDOM (React 18+)
    if (ReactDOM.createRoot) {
        // console.log('🤖 Using React createRoot API (18+)');
        const root = ReactDOM.createRoot(container);
        await new Promise(resolve => {
            root.render(Component);
            setTimeout(resolve, 10); // Даємо час для завершення рендерингу
        });
    } else {
        // console.log('🤖 Using React render API (< 18)');
        // Використовуємо старий API для React < 18
        ReactDOM.render(Component, container);
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    return {
        container,
        unmount: () => {
            try {
                if (ReactDOM.createRoot) {
                    // Для React 18+
                    const root = ReactDOM.createRoot(container);
                    root.unmount();
                } else {
                    // Для React < 18
                    ReactDOM.unmountComponentAtNode(container);
                }
                container.remove();
            } catch (e) {
                console.error('Error when removing the component:', e);
            }
        },
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