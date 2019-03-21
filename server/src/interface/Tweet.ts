interface Tweet {
    message: string
    id: string
    user: User
    isRetweet: boolean
    isQuoting: boolean
    isReplying: boolean
}