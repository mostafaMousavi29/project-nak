export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type ApiMethodConfig = {
    defaultMethod: string
    httpMethod: HttpMethod
    showSnackbar?: boolean
    authorized?: boolean
}

export type ApiMethodDictionary = Record<string, ApiMethodConfig>
