export class ExpectError extends Error {
    constructor(message, matcher, received, expected) {
        super(message)
        this.name = matcher
        this.received = received
        this.expected = expected
    }
}
