import { Transform } from "class-transformer"

/**
 * Trim string value
 */

export function Trim() {
    return Transform(({ value }) => {
        if (typeof value !== 'string') {
            return value
        }
        return value.trim()
    })
}