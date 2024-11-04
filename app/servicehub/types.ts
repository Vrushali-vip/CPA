export type TicketListItem = {
    id: string;
    title: string;
    status: string;
    description: string;
    created: Date;
}

export type Ticket = TicketListItem & {
    expand: {
        customer: {
            id: string;
            name: string;
        }
    }
    attachments: string[];
}

export type TicketComment = {
    id: string;
    ticket: string;
    user: string;
    content: string;
    created: Date;
    attachments: string[];  
    expand: {
        user: {
            id: string;
            name: string;
        }
    } 
}