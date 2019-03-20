interface Tweet {
    message: string
    id: number
    user: User
    isRetweet: boolean
    isQuoting: boolean
    isReplying: boolean
}