use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("9zcgmcAHXhwhYqxvG5UAt8mUUpAbUiY1qoY7y5e1cue3");

#[program]
pub mod hello_world {
    use super::*;

    pub fn create_post(
        ctx: Context<CreatePost>,
        text: String,
        media: String,
        position: i64,
        admin: bool,
    ) -> ProgramResult {
        let post = &mut ctx.accounts.feed_post_app;
        post.admin = admin;
        post.media = media;
        post.position = position;
        post.text = text;
        Ok(()) //solana want to know to run the program successfully
    }
}

//Here "ctx: Context<CreatePost>" is list of accounts create_post needs to retirve the data from the accounts.

#[derive(Accounts)] //It helps to be part of create_post function ctx:context
pub struct CreatePost<'info> {
    #[account(init,payer=user,space=9000)]
    pub feed_post_app: Account<'info, FeedPostApp>, //create a new account and link to your FeedPostApp account
    #[account(mut)]
    pub user: Signer<'info>, //signer must sign the transaction to create the account
    pub system_program: Program<'info, System>,
}

//Here "init" macro is to create new FeedPostApp account
//Payer is for when creating the new FeedPostApp account will cost us money in blockchain which will paid by the user
//Space is for amount of space to be allocated in solana blockchain to allocation to this account i.e space can specific for basic - 264
//Here system program is used specify the system specification to run the porgram into blockchain

#[account]
pub struct FeedPostApp {
    //The place where will describe the data structure
    pub text: String,
    pub media: String,
    pub position: i64, //number
    pub admin: bool,
}
