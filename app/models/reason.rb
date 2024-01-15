class Reason < ApplicationRecord
  after_create :set_ordering_increment
  after_destroy :update_ordering_after_destroy

  belongs_to :storefront

  validates :code, presence: true, uniqueness: { scope: :storefront_id }
  validates :label, presence: true

  scope :ordered, -> { order(ordering: :asc) }
  
  private

  def set_ordering_increment
    return unless self.ordering.nil?

    highest_ordering = storefront.reasons.maximum(:ordering)
    self.update_column(:ordering, highest_ordering.to_i + 1)
  end

  def update_ordering_after_destroy
    remaining_reasons = storefront.reasons.where.not(id: self.id).ordered

    remaining_reasons.each_with_index do |reason, index|
      new_ordering = index + 1
      reason.update_column(:ordering, new_ordering) unless reason.ordering == new_ordering
    end
  end
end
