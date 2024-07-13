use anchor_lang::prelude::*;

declare_id!("8JfmJ8aBjXco5uvS7tttZV2g8cmGtPnSLeQGdEvaAV3W");

#[program]
pub mod basic {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
