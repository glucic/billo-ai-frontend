type FormErrors<T extends string = string> = Partial<
    Record<T | 'general', string[]>
>
