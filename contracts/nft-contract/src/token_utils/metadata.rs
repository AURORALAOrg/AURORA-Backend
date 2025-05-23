use soroban_sdk::{contracttype, symbol_short, unwrap::UnwrapOptimized, Env, String, Symbol};

const METADATA_KEY: Symbol = symbol_short!("METADATA");

#[derive(Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
#[contracttype]
pub struct TokenMetadata {
    pub name: String,
    pub symbol: String,
    pub base_uri: String,
}

pub struct Metadata {
    env: Env,
}

impl Metadata {
    pub fn new(env: &Env) -> Metadata {
        Metadata { env: env.clone() }
    }

    #[inline(always)]
    pub fn set_metadata(&self, metadata: &TokenMetadata) {
        self.env.storage().instance().set(&METADATA_KEY, metadata);
    }

    #[inline(always)]
    pub fn get_metadata(&self) -> TokenMetadata {
        self.env
            .storage()
            .instance()
            .get(&METADATA_KEY)
            .unwrap_optimized()
    }
}
